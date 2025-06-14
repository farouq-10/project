// connectionDb.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Use environment variables for sensitive credentials
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required environment variables: SUPABASE_URL and/or SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a pool-like interface for SQL queries that works with Supabase
export const pool = {
  query: async (text, params = []) => {
    // Convert SQL query to Supabase query
    // This is a simplified adapter and may need to be expanded based on specific SQL queries used
    
    // Extract table name from the query (simple regex for basic queries)
    const tableMatch = text.match(/FROM\s+([\w_]+)/i);
    const table = tableMatch ? tableMatch[1] : null;
    
    if (!table) {
      throw new Error('Could not determine table name from query');
    }
    
    // Handle different query types
    if (text.startsWith('SELECT')) {
      // For SELECT queries
      let query = supabase.from(table).select('*');
      
      // Handle WHERE conditions (very simplified)
      const whereMatch = text.match(/WHERE\s+([\w_]+)\s*=\s*\?/i);
      if (whereMatch && params.length > 0) {
        const column = whereMatch[1];
        query = query.eq(column, params[0]);
      }
      
      // Handle LIKE conditions (for search)
      const likeMatch = text.match(/WHERE\s+([\w_]+)\s+LIKE\s+\?/i);
      if (likeMatch && params.length > 0) {
        const column = likeMatch[1];
        // Remove % wildcards for ilike
        const searchValue = params[0].replace(/%/g, '');
        query = query.ilike(column, `%${searchValue}%`);
      }
      
      // Handle multiple LIKE conditions with OR
      const multipleLikeMatch = text.match(/WHERE\s+([\w_]+)\s+LIKE\s+\?\s+OR\s+([\w_]+)\s+LIKE\s+\?/i);
      if (multipleLikeMatch && params.length >= 2) {
        const column1 = multipleLikeMatch[1];
        const column2 = multipleLikeMatch[2];
        // Use or filter for multiple conditions
        query = query.or(`${column1}.ilike.%${params[0].replace(/%/g, '')}%,${column2}.ilike.%${params[1].replace(/%/g, '')}%`);
      }
      
      // Handle ORDER BY
      const orderByMatch = text.match(/ORDER\s+BY\s+([\w_]+)(?:\s*,\s*([\w_]+))?/i);
      if (orderByMatch) {
        const orderColumns = orderByMatch.slice(1).filter(Boolean);
        orderColumns.forEach(column => {
          query = query.order(column);
        });
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return [data || [], null];
    } 
    else if (text.startsWith('INSERT')) {
      // For INSERT queries
      const columns = text.match(/\(([^)]+)\)/)[1].split(',').map(col => col.trim());
      
      // Create an object from columns and params
      const insertData = {};
      columns.forEach((col, index) => {
        insertData[col] = params[index];
      });
      
      const { data, error } = await supabase.from(table).insert(insertData).select();
      if (error) throw error;
      return [{ insertId: data[0].id, ...data[0] }, null];
    }
    else if (text.startsWith('UPDATE')) {
      // For UPDATE queries
      const idIndex = params.length - 1; // Assuming ID is the last parameter
      const id = params[idIndex];
      
      // Extract columns to update
      const updateData = {};
      const setMatch = text.match(/SET\s+([^\s]+)\s*=\s*\?/g);
      
      if (setMatch) {
        setMatch.forEach((match, index) => {
          const column = match.match(/SET\s+([^\s]+)\s*=/)[1];
          updateData[column] = params[index];
        });
      }
      
      const { data, error } = await supabase
        .from(table)
        .update(updateData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return [data, null];
    }
    else if (text.startsWith('DELETE')) {
      // For DELETE queries
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', params[0]);
      
      if (error) throw error;
      return [{ affectedRows: 1 }, null];
    }
    
    throw new Error(`Unsupported query type: ${text}`);
  }
};

export default supabase;
