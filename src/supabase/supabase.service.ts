import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  async insertTransaction(data: {
    customer_name: string;
    vehicle: string;
    confirmation_id: string;
  }) {
    const { error } = await this.supabase
      .from('transactions')
      .insert([data]);

    if (error) {
      console.error(error);
      throw error;
    }

    console.log('Transaction saved to Supabase.');
  }
}
