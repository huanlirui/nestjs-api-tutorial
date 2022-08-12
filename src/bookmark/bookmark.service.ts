import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBookmarkDto } from './dto';
import { editBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    const bookmarks = this.prisma.bookmark.findMany({
      where: { userId: userId },
    });
    return bookmarks;
  }
  getBookmarkById(userId: number, bookmarkId: number) {
    const bokkmark = this.prisma.bookmark.findUnique({
      where: {
        // userId: userId,
        id: bookmarkId,
      },
    });
  }
  createBookmarkById(userId: number, dto: createBookmarkDto) {
    throw new Error('Method not implemented.');
  }
  editBookmarkById(userId: number, dto: editBookmarkDto) {
    throw new Error('Method not implemented.');
  }
  deleteBookmarkById(userId: number, bookmarkId: number) {
    throw new Error('Method not implemented.');
  }
}
