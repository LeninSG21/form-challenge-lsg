export const ENVIRONMENTS = {
  development: 'development',
  production: 'production',
} as const;

export type EnvironmentType = typeof ENVIRONMENTS[keyof typeof ENVIRONMENTS];

interface EnvironmentConfig {
  API: {
    v1: string;
  };
}

const ENVIRONMENTS_CONFIG: Record<EnvironmentType, EnvironmentConfig> = {
  [ENVIRONMENTS.development]: {
    API: {
      v1: 'http://some-dev-api.test',
    },
  },
  [ENVIRONMENTS.production]: {
    API: {
      v1: 'http://some-prod-api.test',
    },
  },
};

export const config = (
  appEnv: EnvironmentType = process.env.NODE_ENV as EnvironmentType,
) => {
  const finalAppEnv = ENVIRONMENTS_CONFIG[appEnv]
    ? appEnv
    : ENVIRONMENTS.development;

  const env = {
    NODE_ENV: finalAppEnv,
    ...ENVIRONMENTS_CONFIG[finalAppEnv],
  };

  return env;
};
