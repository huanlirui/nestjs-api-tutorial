import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { AuthDto } from 'src/auth/dto';
import { createBookmarkDto, editBookmarkDto } from 'src/bookmark/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from 'src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const mouduleref = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = mouduleref.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.clearDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: '123@gmail.com',
      password: '123',
    };
    describe('signUp', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signUp')
          .withBody({
            email: '',
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if passowrd empty', () => {
        return pactum
          .spec()
          .post('/auth/signUp')
          .withBody({
            email: dto.email,
            password: '',
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signUp').expectStatus(400);
      });

      it('should signUp', () => {
        return pactum
          .spec()
          .post('/auth/signUp')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('signIn', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signIn')
          .withBody({
            email: '',
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if passowrd empty', () => {
        return pactum
          .spec()
          .post('/auth/signIn')
          .withBody({
            email: dto.email,
            password: '',
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signIn').expectStatus(400);
      });
      it('should signIn', () => {
        return pactum
          .spec()
          .post('/auth/signIn')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('should Edit user', () => {
        const dto: EditUserDto = {
          firstName: 'ffff123',
          email: '123@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users/edit')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });
  describe('Bookmarks', () => {
    describe('Get many bookmark', () => {
      it('should get bokkmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create bookmark', () => {
      it('should create bookmark', () => {
        const dto: createBookmarkDto = {
          title: 'title',
          link: 'https://www.youtube.com/watch?v=GHTA143_b-s&list=LL&index=2&t=9795s',
        };
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get bookmark by id', () => {
      it('should get bookmark by id', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');
      });
    });
    describe('Edit bookmark by id', () => {
      const dto: editBookmarkDto = {
        title: 'youtube',
        link: 'https://www.youtube.com/',
        description: '123',
      };
      it('should Edit bookmark', () => {
        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}')
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.link)
          .expectBodyContains(dto.description);
      });
    });
    describe('Delete bookmark by id', () => {
      it('should delete bookmark by id', () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(204);
      });
      it('should get empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });

  it.todo('should pass');
});
