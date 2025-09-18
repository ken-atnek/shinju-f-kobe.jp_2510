/* =======================================
 * 真珠夫人神戸本店 年齢認証ユーティリティ
 * URL: src/lib/age.ts
 * Created: 2025-09-18
 * Last updated: 2025-09-18
 * ======================================= */

// 保存形式
type StoredFlag = { exp: number; v: 1 };

const STORAGE_KEY = 'age-verified';

// 設定ファイル（本番時のみ使用）
const CONFIG_URL = '/age.config.json';

// 開発環境でのTTL設定（分単位）
const DEV_TTL_MINUTES = 60; // 開発時: 60分

// 環境判定（.env.productionで管理）
const isRealProduction = process.env.NEXT_PUBLIC_IS_REAL_PROD === 'true';
const isDev = !isRealProduction;

// 本番用設定ファイルの構造
type AgeJson = {
  ttlHours?: number;
  ttlMinutes?: number;
};

// 本番時のTTL取得（設定ファイルから）
const loadTtlMinutes = async (): Promise<number> => {
  try {
    const res = await fetch(CONFIG_URL);
    if (!res.ok) throw new Error(`Failed to fetch config: ${res.statusText}`);
    const json: AgeJson = await res.json();

    // 優先順位: ttlMinutes > ttlHours
    return json.ttlMinutes ?? (json.ttlHours ?? 24) * 60;
  } catch (error) {
    console.error('Failed to load age config:', error);
    return 1440; // フォールバック: 24時間
  }
};

/**
 * 認証済みにする
 */
export const setAgeVerified = async () => {
  const ttlMinutes = isDev ? DEV_TTL_MINUTES : await loadTtlMinutes();
  const exp = Date.now() + ttlMinutes * 60 * 1000; // 分→ミリ秒変換

  const flag: StoredFlag = { exp, v: 1 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flag));
};

/**
 * 認証済みか判定
 */
export const isAgeVerified = () => {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;

  if (raw === '1') {
    // 旧仕様：本番では無期限扱い、開発では無効扱い
    return isRealProduction;
  }

  try {
    const obj = JSON.parse(raw) as StoredFlag;
    return typeof obj.exp === 'number' && Date.now() < obj.exp;
  } catch (error) {
    console.error('Failed to parse age verification flag:', error);
    return false;
  }
};

/** 認証フラグをクリア */
export const clearAgeVerified = () => {
  localStorage.removeItem(STORAGE_KEY);
};

/** 現在のTTL設定を取得（デバッグ用） */
export const getCurrentTTL = async () => {
  const minutes = isDev ? DEV_TTL_MINUTES : await loadTtlMinutes();
  return {
    minutes,
    hours: minutes / 60,
    environment: isRealProduction ? 'production' : 'development',
    source: isDev ? 'hardcoded' : 'age.config.json',
  };
};
