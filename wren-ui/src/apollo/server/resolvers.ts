import GraphQLJSON from 'graphql-type-json';
import { ProjectResolver } from './resolvers/projectResolver';
import { ModelResolver } from './resolvers/modelResolver';
import { AskingResolver } from './resolvers/askingResolver';
import { DiagramResolver } from './resolvers/diagramResolver';
import { LearningResolver } from './resolvers/learningResolver';
import { DashboardResolver } from './resolvers/dashboardResolver';
import { SqlPairResolver } from './resolvers/sqlPairResolver';
import { InstructionResolver } from './resolvers/instructionResolver';
import { ApiHistoryResolver } from './resolvers/apiHistoryResolver';
import { convertColumnType } from '@server/utils';
import { DialectSQLScalar } from './scalars';

const projectResolver = new ProjectResolver();
const modelResolver = new ModelResolver();
const askingResolver = new AskingResolver();
const diagramResolver = new DiagramResolver();
const learningResolver = new LearningResolver();
const dashboardResolver = new DashboardResolver();
const sqlPairResolver = new SqlPairResolver();
const instructionResolver = new InstructionResolver();
const apiHistoryResolver = new ApiHistoryResolver();
const resolvers = {
  JSON: GraphQLJSON,
  DialectSQL: DialectSQLScalar,
  Query: {
    listDataSourceTables: projectResolver.listDataSourceTables,
    autoGenerateRelation: projectResolver.autoGenerateRelation,
    listModels: modelResolver.listModels,
    model: modelResolver.getModel,
    onboardingStatus: projectResolver.getOnboardingStatus,
    modelSync: modelResolver.checkModelSync,
    diagram: diagramResolver.getDiagram,
    schemaChange: projectResolver.getSchemaChange,

    // Ask
    askingTask: askingResolver.getAskingTask,
    suggestedQuestions: askingResolver.getSuggestedQuestions,
    instantRecommendedQuestions: askingResolver.getInstantRecommendedQuestions,

    // Adjustment
    adjustmentTask: askingResolver.getAdjustmentTask,

    // Thread
    thread: askingResolver.getThread,
    threads: askingResolver.listThreads,
    threadResponse: askingResolver.getResponse,
    nativeSql: modelResolver.getNativeSql,

    // Views
    listViews: modelResolver.listViews,
    view: modelResolver.getView,

    // Settings
    settings: projectResolver.getSettings,
    getMDL: modelResolver.getMDL,

    // Learning
    learningRecord: learningResolver.getLearningRecord,

    // Recommendation questions
    getThreadRecommendationQuestions:
      askingResolver.getThreadRecommendationQuestions,
    getProjectRecommendationQuestions:
      projectResolver.getProjectRecommendationQuestions,

    // Dashboard
    dashboardItems: dashboardResolver.getDashboardItems,

    // SQL Pairs
    sqlPairs: sqlPairResolver.getProjectSqlPairs,
    // Instructions
    instructions: instructionResolver.getInstructions,

    // API History
    apiHistory: apiHistoryResolver.getApiHistory,
  },
  Mutation: {
    deploy: modelResolver.deploy,
    saveDataSource: projectResolver.saveDataSource,
    startSampleDataset: projectResolver.startSampleDataset,
    saveTables: projectResolver.saveTables,
    saveRelations: projectResolver.saveRelations,
    createModel: modelResolver.createModel,
    updateModel: modelResolver.updateModel,
    deleteModel: modelResolver.deleteModel,
    previewModelData: modelResolver.previewModelData,
    updateModelMetadata: modelResolver.updateModelMetadata,
    triggerDataSourceDetection: projectResolver.triggerDataSourceDetection,
    resolveSchemaChange: projectResolver.resolveSchemaChange,

    // calculated field
    createCalculatedField: modelResolver.createCalculatedField,
    validateCalculatedField: modelResolver.validateCalculatedField,
    updateCalculatedField: modelResolver.updateCalculatedField,
    deleteCalculatedField: modelResolver.deleteCalculatedField,

    // relation
    createRelation: modelResolver.createRelation,
    updateRelation: modelResolver.updateRelation,
    deleteRelation: modelResolver.deleteRelation,

    // Ask
    createAskingTask: askingResolver.createAskingTask,
    cancelAskingTask: askingResolver.cancelAskingTask,
    createInstantRecommendedQuestions:
      askingResolver.createInstantRecommendedQuestions,
    rerunAskingTask: askingResolver.rerunAskingTask,

    // Adjustment
    adjustThreadResponse: askingResolver.adjustThreadResponse,
    cancelAdjustmentTask: askingResolver.cancelAdjustThreadResponseAnswer,
    rerunAdjustmentTask: askingResolver.rerunAdjustThreadResponseAnswer,

    // Thread
    createThread: askingResolver.createThread,
    updateThread: askingResolver.updateThread,
    deleteThread: askingResolver.deleteThread,
    createThreadResponse: askingResolver.createThreadResponse,
    updateThreadResponse: askingResolver.updateThreadResponse,
    previewData: askingResolver.previewData,
    previewBreakdownData: askingResolver.previewBreakdownData,

    // Generate Thread Response Breakdown
    generateThreadResponseBreakdown:
      askingResolver.generateThreadResponseBreakdown,

    // Generate Thread Response Answer
    generateThreadResponseAnswer: askingResolver.generateThreadResponseAnswer,

    // Generate Thread Response Chart
    generateThreadResponseChart: askingResolver.generateThreadResponseChart,

    // Adjust Thread Response Chart
    adjustThreadResponseChart: askingResolver.adjustThreadResponseChart,

    // Views
    createView: modelResolver.createView,
    deleteView: modelResolver.deleteView,
    previewViewData: modelResolver.previewViewData,
    validateView: modelResolver.validateView,
    updateViewMetadata: modelResolver.updateViewMetadata,

    // Settings
    resetCurrentProject: projectResolver.resetCurrentProject,
    updateCurrentProject: projectResolver.updateCurrentProject,
    updateDataSource: projectResolver.updateDataSource,

    // preview
    previewSql: modelResolver.previewSql,

    // Learning
    saveLearningRecord: learningResolver.saveLearningRecord,

    // Recommendation questions
    generateThreadRecommendationQuestions:
      askingResolver.generateThreadRecommendationQuestions,
    generateProjectRecommendationQuestions:
      askingResolver.generateProjectRecommendationQuestions,

    // Dashboard
    updateDashboardItemLayouts: dashboardResolver.updateDashboardItemLayouts,
    createDashboardItem: dashboardResolver.createDashboardItem,
    updateDashboardItem: dashboardResolver.updateDashboardItem,
    deleteDashboardItem: dashboardResolver.deleteDashboardItem,
    previewItemSQL: dashboardResolver.previewItemSQL,

    // SQL Pairs
    createSqlPair: sqlPairResolver.createSqlPair,
    updateSqlPair: sqlPairResolver.updateSqlPair,
    deleteSqlPair: sqlPairResolver.deleteSqlPair,
    generateQuestion: sqlPairResolver.generateQuestion,
    modelSubstitute: sqlPairResolver.modelSubstitute,
    // Instructions
    createInstruction: instructionResolver.createInstruction,
    updateInstruction: instructionResolver.updateInstruction,
    deleteInstruction: instructionResolver.deleteInstruction,
  },
  ThreadResponse: askingResolver.getThreadResponseNestedResolver(),
  DetailStep: askingResolver.getDetailStepNestedResolver(),
  ResultCandidate: askingResolver.getResultCandidateNestedResolver(),

  // Handle struct type to record for UI
  DiagramModelField: { type: convertColumnType },
  DiagramModelNestedField: { type: convertColumnType },
  CompactColumn: { type: convertColumnType },
  FieldInfo: { type: convertColumnType },
  DetailedColumn: { type: convertColumnType },
  DetailedNestedColumn: { type: convertColumnType },
  DetailedChangeColumn: { type: convertColumnType },

  // Add this line to include the SqlPair nested resolver
  SqlPair: sqlPairResolver.getSqlPairNestedResolver(),

  // Add ApiHistoryResponse nested resolvers
  ApiHistoryResponse: apiHistoryResolver.getApiHistoryNestedResolver(),
};

export default resolvers;
