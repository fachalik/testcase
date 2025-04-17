import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';

@Injectable()
export class BarangService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBarangDto, userId: string) {
    try {
      if (!userId) {
        throw new HttpException(
          {
            message: 'User ID is required',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return this.prisma.barang.create({ data: { ...data, userId } });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(
    userId: string,
    page?: number,
    limit?: number,
    search?: string,
  ) {
    if (!userId) {
      throw new HttpException(
        {
          message: 'User ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if ((page && !limit) || (!page && limit)) {
      throw new HttpException(
        {
          message: 'Page and limit are required together',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (page && page < 1) {
      throw new HttpException(
        {
          message: 'Page must be greater than 0',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (limit && limit < 1) {
      throw new HttpException(
        {
          message: 'Limit must be greater than 0',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const shouldPaginate = page !== undefined && limit !== undefined;

    const data = await this.prisma.barang.findMany({
      where: { userId, name: { contains: search } },
      orderBy: { createdAt: 'desc' },
      ...(shouldPaginate && {
        skip: (page - 1) * limit,
        take: limit,
      }),
    });

    const totalItems = await this.prisma.barang.count({
      where: {
        userId,
        ...(search && { name: { contains: search } }),
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    if (shouldPaginate) {
      return {
        data,
        meta: {
          currentPage: page,
          offset: (page - 1) * limit,
          itemsPerPage: limit,
          unpaged: false,
          totalPages,
          totalItems,
        },
        // total,
        // page: shouldPaginate ? page : 1,
        // pageSize: shouldPaginate ? limit : total,
      };
    }

    return data;
  }

  findOne(id: string, userId: string) {
    if (!userId) {
      throw new HttpException(
        {
          message: 'ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userId) {
      throw new HttpException(
        {
          message: 'User ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.barang.findUnique({ where: { id, userId } });
  }

  update(id: string, data: UpdateBarangDto, userId: string) {
    if (!userId) {
      throw new HttpException(
        {
          message: 'ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userId) {
      throw new HttpException(
        {
          message: 'User ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.barang.update({ where: { id, userId }, data });
  }

  remove(id: string, userId: string) {
    if (!userId) {
      throw new HttpException(
        {
          message: 'ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userId) {
      throw new HttpException(
        {
          message: 'User ID is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.barang.delete({ where: { id, userId } });
  }

  async getStats(userId: string) {
    const totalBarangUser = await this.prisma.barang.count({
      where: { userId },
    });

    const totalBarang = await this.prisma.barang.count();
    const totalUsers = await this.prisma.user.count();
    const totalPrice = await this.prisma.barang.aggregate({
      _sum: {
        price: true,
      },
    });

    const topExpensiveBarang = await this.prisma.barang.findMany({
      orderBy: { price: 'desc' },
      take: 5,
    });

    const userBarangCount = await this.prisma.user.findMany({
      include: {
        _count: {
          select: { barang: true },
        },
      },
      orderBy: {
        barang: {
          _count: 'desc',
        },
      },
      take: 1,
    });

    const barangPerUser = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { barang: true },
        },
      },
    });

    return {
      totalBarangUser,
      totalBarang,
      totalUsers,
      totalPrice: totalPrice._sum.price || 0,
      topExpensiveBarang,
      topUser: userBarangCount[0],
      barangPerUser,
    };
  }
}
