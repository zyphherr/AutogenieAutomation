import { Module } from '@nestjs/common';
import { BridgeController } from './bridge.controller';
import { OrchestratorModule } from '../orchestrator/orchestrator.module';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [OrchestratorModule, SupabaseModule],
  controllers: [BridgeController],
})
export class BridgeModule {}
