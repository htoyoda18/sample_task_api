import { createLogger, format, transports } from 'winston';
import cliColor from 'cli-color';

// カラフルなログ出力用の色設定
const colorfulFormat = format.printf(({ level, message }) => {
    let colorizedLevel;

    switch (level) {
        case 'error':
            colorizedLevel = cliColor.red(level);
            break;
        case 'warn':
            colorizedLevel = cliColor.yellow(level);
            break;
        case 'info':
            colorizedLevel = cliColor.green(level);
            break;
        default:
            colorizedLevel = level;
            break;
    }

    return `${colorizedLevel}: ${message}`;
});

export const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        colorfulFormat // カラフルなフォーマットを適用
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.Console()
    ]
});