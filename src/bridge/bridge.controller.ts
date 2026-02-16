import { Controller, Post, Body } from '@nestjs/common';
import { OrchestratorService } from '../orchestrator/orchestrator.service';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('agent')
export class BridgeController {
  constructor(
    private readonly orchestrator: OrchestratorService,
    private readonly supabase: SupabaseService,
  ) {}

  @Post('action')
  async handleAiAction(
    @Body()
    body: {
      action: string;
      customerName: string;
      vehicle: string;
    },
  ) {
    console.log(`🧠 AutoGenie received: ${body.action}`);

    const result = await this.orchestrator.process(body);

    if (result.status === 'SUCCESS') {
      await this.supabase.insertTransaction({
        customer_name: body.customerName,
        vehicle: body.vehicle,
        confirmation_id: result.confirmation_id!,
      });
    }

    return result;
  }
}
