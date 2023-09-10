import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export abstract class PrismaRepositoryBase {
    constructor(protected readonly prismaService: PrismaService) {}
}