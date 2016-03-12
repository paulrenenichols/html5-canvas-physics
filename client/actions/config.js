// TODO actions need comments documenting their purpose
export const CONFIG_ADD = 'CONFIG_ADD';
export function configAdd(config) {
    return {
        type: CONFIG_ADD,
        config: config
    }
}
