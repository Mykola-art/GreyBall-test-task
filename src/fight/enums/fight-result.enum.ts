import { registerEnumType } from '@nestjs/graphql';

export enum FightResult {
  KO = 'KO',
  SUBMISSION = 'SUBMISSION',
  DECISION = 'DECISION',
  DRAW = 'DRAW',
}

registerEnumType(FightResult, {
  name: 'FightResult',
  description:
    'Possible outcomes of a fight: KO (knockout), SUBMISSION, DECISION, or DRAW.',
});
