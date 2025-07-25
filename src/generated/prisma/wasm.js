
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.CaregiverScalarFieldEnum = {
  id: 'id',
  name: 'name',
  cpf: 'cpf',
  rg: 'rg',
  address: 'address',
  district: 'district',
  contact: 'contact',
  born: 'born',
  pregnant: 'pregnant',
  isPending: 'isPending',
  supervisorId: 'supervisorId',
  visitadorId: 'visitadorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  weekPregnant: 'weekPregnant'
};

exports.Prisma.ChamadoScalarFieldEnum = {
  id: 'id',
  type: 'type',
  description: 'description',
  userId: 'userId',
  recipientId: 'recipientId'
};

exports.Prisma.ChildScalarFieldEnum = {
  id: 'id',
  name: 'name',
  nis: 'nis',
  born: 'born',
  visitorId: 'visitorId',
  caregiverId: 'caregiverId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isPending: 'isPending',
  gender: 'gender',
  isBpc: 'isBpc'
};

exports.Prisma.Etapa1ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  q10: 'q10',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Etapa2ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Etapa3ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Etapa4ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Etapa5ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Etapa6ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Etapa7ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FaltaScalarFieldEnum = {
  id: 'id',
  reason: 'reason',
  occurrenceDate: 'occurrenceDate',
  isInvalidated: 'isInvalidated',
  invalidationRequest: 'invalidationRequest',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  recorderId: 'recorderId',
  invalidationRequestAccepted: 'invalidationRequestAccepted',
  justificationReason: 'justificationReason',
  isJustified: 'isJustified'
};

exports.Prisma.NotificacaoScalarFieldEnum = {
  id: 'id',
  type: 'type',
  description: 'description',
  visitorId: 'visitorId',
  supervisorId: 'supervisorId',
  coordinatorId: 'coordinatorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlanoDeVisitasScalarFieldEnum = {
  id: 'id',
  objective: 'objective',
  etapa1: 'etapa1',
  etapa2: 'etapa2',
  etapa3: 'etapa3',
  observation: 'observation',
  realizationDay: 'realizationDay',
  scheduledDay: 'scheduledDay',
  objectiveDifficulty: 'objectiveDifficulty',
  realizationStatus: 'realizationStatus',
  realizedWithDifficulty: 'realizedWithDifficulty',
  visitorId: 'visitorId',
  childId: 'childId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  caregiverId: 'caregiverId'
};

exports.Prisma.SequelizeMetaScalarFieldEnum = {
  name: 'name'
};

exports.Prisma.TabelaDeVisitasScalarFieldEnum = {
  id: 'id',
  dateOfVisit: 'dateOfVisit',
  childVisited: 'childVisited',
  dayOfVisit: 'dayOfVisit',
  period: 'period',
  visitorId: 'visitorId',
  childId: 'childId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  caregiverId: 'caregiverId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  password: 'password',
  role: 'role',
  cpf: 'cpf',
  email: 'email',
  territorio: 'territorio',
  cras: 'cras',
  isPending: 'isPending',
  isActive: 'isActive',
  restrictionMakePlain: 'restrictionMakePlain',
  restrictLoginVisitPending: 'restrictLoginVisitPending',
  earlyAccess: 'earlyAccess',
  supervisorId: 'supervisorId',
  coordenadorId: 'coordenadorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VisitaPorGeolocalizacaoScalarFieldEnum = {
  id: 'id',
  latitude: 'latitude',
  longitude: 'longitude',
  startTime: 'startTime',
  endTime: 'endTime',
  finalLatitude: 'finalLatitude',
  finalLongitude: 'finalLongitude',
  isFinished: 'isFinished',
  isFakeVisit: 'isFakeVisit',
  isValidationPending: 'isValidationPending',
  nonRealizationReason: 'nonRealizationReason',
  invalidationReason: 'invalidationReason',
  isBeneficiaryHome: 'isBeneficiaryHome',
  beneficiaryLatitude: 'beneficiaryLatitude',
  beneficiaryLongitude: 'beneficiaryLongitude',
  scheduledDate: 'scheduledDate',
  isScheduledVisitFinished: 'isScheduledVisitFinished',
  isVisitInProgress: 'isVisitInProgress',
  visitorId: 'visitorId',
  childId: 'childId',
  planId: 'planId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  caregiverId: 'caregiverId'
};

exports.Prisma.Form7Etapa1ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  q10: 'q10',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Form7Etapa2ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Form7Etapa3ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Form7Etapa4ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Form7Etapa5ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Form7Etapa6ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Form7Etapa7ScalarFieldEnum = {
  id: 'id',
  q1: 'q1',
  q2: 'q2',
  q3: 'q3',
  q4: 'q4',
  q5: 'q5',
  q6: 'q6',
  q7: 'q7',
  q8: 'q8',
  q9: 'q9',
  childId: 'childId',
  visitorId: 'visitorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.ChamadoType = exports.$Enums.ChamadoType = {
  bug: 'bug',
  duvida: 'duvida',
  edicao: 'edicao',
  outros: 'outros'
};

exports.ChildGender = exports.$Enums.ChildGender = {
  Masculino: 'Masculino',
  Feminino: 'Feminino'
};

exports.EtapaAnswer = exports.$Enums.EtapaAnswer = {
  Consegue_fazer_sozinho: 'Consegue_fazer_sozinho',
  Consegue_fazer_com_Ajuda: 'Consegue_fazer_com_Ajuda',
  Ainda_n_o_consegue_fazer: 'Ainda_n_o_consegue_fazer'
};

exports.NotificacaoType = exports.$Enums.NotificacaoType = {
  Evento: 'Evento',
  Reuniao: 'Reuniao',
  Falta: 'Falta',
  Outras: 'Outras'
};

exports.PlanoVisitaDificuldade = exports.$Enums.PlanoVisitaDificuldade = {
  Facil: 'Facil',
  Media: 'Media',
  Dificil: 'Dificil'
};

exports.PlanoVisitaRealizacao = exports.$Enums.PlanoVisitaRealizacao = {
  Com_ajuda: 'Com_ajuda',
  Sem_ajuda: 'Sem_ajuda',
  N_o_quis_fazer: 'N_o_quis_fazer'
};

exports.TabelaVisitaDia = exports.$Enums.TabelaVisitaDia = {
  Segunda: 'Segunda',
  Terca: 'Terca',
  Quarta: 'Quarta',
  Quinta: 'Quinta',
  Sexta: 'Sexta'
};

exports.TabelaVisitaPeriodo = exports.$Enums.TabelaVisitaPeriodo = {
  Manha: 'Manha',
  Tarde: 'Tarde'
};

exports.UserRole = exports.$Enums.UserRole = {
  visitador: 'visitador',
  supervisor: 'supervisor',
  coordenador: 'coordenador'
};

exports.Prisma.ModelName = {
  Caregiver: 'Caregiver',
  Chamado: 'Chamado',
  Child: 'Child',
  Etapa1: 'Etapa1',
  Etapa2: 'Etapa2',
  Etapa3: 'Etapa3',
  Etapa4: 'Etapa4',
  Etapa5: 'Etapa5',
  Etapa6: 'Etapa6',
  Etapa7: 'Etapa7',
  Falta: 'Falta',
  Notificacao: 'Notificacao',
  PlanoDeVisitas: 'PlanoDeVisitas',
  SequelizeMeta: 'SequelizeMeta',
  TabelaDeVisitas: 'TabelaDeVisitas',
  User: 'User',
  VisitaPorGeolocalizacao: 'VisitaPorGeolocalizacao',
  Form7Etapa1: 'Form7Etapa1',
  Form7Etapa2: 'Form7Etapa2',
  Form7Etapa3: 'Form7Etapa3',
  Form7Etapa4: 'Form7Etapa4',
  Form7Etapa5: 'Form7Etapa5',
  Form7Etapa6: 'Form7Etapa6',
  Form7Etapa7: 'Form7Etapa7'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
