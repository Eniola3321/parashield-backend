import { ApiProperty } from '@nestjs/swagger';

export class DatabaseCheckDto {
  @ApiProperty({ description: 'Database connectivity status', enum: ['ok', 'error'] })
  status: 'ok' | 'error';

  @ApiProperty({ description: 'Error message when status is "error"', required: false })
  error?: string;
}

export class StellarCheckDto {
  @ApiProperty({ description: 'Stellar RPC/keeper connectivity status', enum: ['ok', 'error'] })
  status: 'ok' | 'error';

  @ApiProperty({ description: 'Keeper account native XLM balance (7-decimal fixed point)', required: false })
  keeperBalanceXlm?: string;

  @ApiProperty({ description: 'Error message when status is "error"', required: false })
  error?: string;
}

export class HealthChecksDto {
  @ApiProperty({ type: DatabaseCheckDto })
  database: DatabaseCheckDto;

  @ApiProperty({ type: StellarCheckDto })
  stellar: StellarCheckDto;
}

export class HealthResponseDto {
  @ApiProperty({ description: 'Overall service health', enum: ['ok', 'degraded'] })
  status: 'ok' | 'degraded';

  @ApiProperty({ description: 'Response timestamp (ISO 8601)' })
  timestamp: string;

  @ApiProperty({ description: 'Service identifier', example: 'parashield-api' })
  service: string;

  @ApiProperty({ type: HealthChecksDto })
  checks: HealthChecksDto;
}
