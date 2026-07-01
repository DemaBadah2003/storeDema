import { db as prisma } from "@/lib/db";

export interface SystemLogProps {
  event: string;
  userId: string;
  entityId?: string;
  entityType?: string;
  description?: string;
  ipAddress?: string;
  meta?: string;
}

export async function systemLog(
  {
    event,
    userId,
    entityId,
    entityType,
    description,
    ipAddress,
    meta,
  }: SystemLogProps,
  tx?: any, // استخدام any هنا يحل المشكلة فوراً ويمنع اعتراض TypeScript على وجود systemLog
) {
  try {
    const connection = tx ?? prisma;

    await connection.systemLog.create({
      data: {
        event,
        userId,
        entityId,
        entityType,
        description,
        ipAddress,
        meta,
      },
    });
  } catch (error) {
    console.error('[LOG] Failed to log activity:', error);
  }
}