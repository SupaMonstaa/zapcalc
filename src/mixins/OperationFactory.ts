import OperationKind from '@/types/OperationKind';
import Operation from '@/types/Operation';
import Addition from '@/types/Addition';
import Multiplication from '@/types/Multiplication';
import Division from '@/types/Division';
import Substraction from '@/types/Substraction';
import shuffle from '@/mixins/shuffle';

export default class OperationFactory {
  static getOperationClass(operationKind: OperationKind, level: number): Operation {
    const opKinds: {[key: string]: Function} = {};
    opKinds[OperationKind.addition] = () => Addition;
    opKinds[OperationKind.multiplication] = () => Multiplication;
    opKinds[OperationKind.substraction] = () => Substraction;
    opKinds[OperationKind.division] = () => Division;
    opKinds[OperationKind.mix] = () => shuffle([
      Substraction, Multiplication, Division, Addition,
    ]).pop();
    const OperationClass = opKinds[operationKind]();
    return new OperationClass(level);
  }

  static getLabel(opKind: OperationKind): string {
    switch (opKind) {
      case OperationKind.addition:
        return Addition.label;
      case OperationKind.substraction:
        return Substraction.label;
      case OperationKind.multiplication:
        return Multiplication.label;
      case OperationKind.division:
        return Division.label;
      default:
        return `${Addition.label}${Substraction.label}${Multiplication.label}${Division.label}`;
    }
  }
}
