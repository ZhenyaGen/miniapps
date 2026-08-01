/**
 * Движок берётся из мини-приложения — один расчёт на все клиенты.
 *
 * Здесь только реэкспорт: если бот начнёт считать что-то по-своему, цифры
 * в личных сообщениях разойдутся с тем, что человек видит в приложении.
 */
export { compute } from '../../vk-audit/src/engine/metrics';
export { buildPlan, buildTargets, findGrowthZones } from '../../vk-audit/src/engine/insights';
export { buildCard, compare, topGaps } from '../../vk-audit/src/engine/rivals';
export { f } from '../../vk-audit/src/engine/util';
export type {
  Finding, Metrics, PlanStage, Post, Profile, RawPost, RawStatsDay, Snapshot, Target,
} from '../../vk-audit/src/engine/types';
