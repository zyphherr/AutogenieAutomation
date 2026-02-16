import { Injectable } from '@nestjs/common';

@Injectable()
export class OrchestratorService {
  async process(payload: {
    action: string;
    customerName: string;
    vehicle: string;
  }) {
    if (payload.action !== 'schedule_test_drive') {
      return {
        status: 'FAILED',
        confirmation_id: null,
        message: 'Unknown action',
      };
    }

    // Simulated internal agent logic
    console.log('Internal Agent validating request...');

    const confirmationId = `DEALER-${Math.floor(Math.random() * 10000)}`;

    console.log('🏁 Test drive approved.');

    return {
      status: 'SUCCESS',
      confirmation_id: confirmationId,
      message: `Test drive scheduled for ${payload.vehicle}.`,
    };
  }
}
