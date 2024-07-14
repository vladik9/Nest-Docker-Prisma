import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { CarDto } from '../src/auth/dto/car.dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);
    prismaService = app.get<PrismaService>(PrismaService);
    await prismaService.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: '9pT6P@example.com',
      password: 'test',
    };

    describe('SingIn', () => {
      it('should throw error if email empty', () => {
        return pactum
          .spec()
          .post('/auth/singIn')
          .withBody({ dto: dto.password })
          .expectStatus(400);
      });
      it('should throw error if password empty', () => {
        return pactum
          .spec()
          .post('/auth/singIn')
          .withBody({ dto: dto.email })
          .expectStatus(400);
      });

      it('should be singIn', () => {
        return pactum
          .spec()
          .post('/auth/singIn')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('LogIn', () => {
      it('should throw error if email empty', () => {
        return pactum
          .spec()
          .post('/auth/logIn')
          .withBody({ dto: dto.password })
          .expectStatus(400);
      });
      it('should throw error if password empty', () => {
        return pactum
          .spec()
          .post('/auth/logIn')
          .withBody({ dto: dto.email })
          .expectStatus(400);
      });
      it('should be loggedIn', () => {
        return pactum
          .spec()
          .post('/auth/logIn')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
    describe('LogOut', () => {
      it('should be LogOut', () => {
        return pactum
          .spec()
          .post('/users/logOut')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectStatus(200);
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it('should get user info', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectStatus(200);
      });
    });
  });
  describe('Car', () => {
    const carDto: CarDto = {
      name: 'Toyota',
      year: 2010,
      color: 'red',
      seats: 5,
      userId: 1,
    };
    // TODO: should be implemented

    it('Create a Car valid', () => {
      return pactum
        .spec()
        .post('/car')
        .withHeaders('Authorization', 'Bearer $S{userAt}')
        .withBody(carDto)
        .expectStatus(201);
    });

    it('Should fail if Car data not valid', () => {
      return pactum
        .spec()
        .post('/car')
        .withHeaders('Authorization', 'Bearer $S{userAt}')
        .withBody({
          name: carDto.name,
          color: carDto.color,
        })
        .expectStatus(400);
    });
    it('Should work on update car', () => {
      return pactum
        .spec()
        .patch('/car/1')
        .withHeaders('Authorization', 'Bearer $S{userAt}')
        .withBody({
          name: 'Honda',
          year: 2010,
          color: 'red',
          seats: 5,
          userId: 1,
        })
        .expectStatus(200);
    });
  });
  it('Should return a car with id 1', () => {
    return pactum
      .spec()
      .get('/car/1')
      .withHeaders('Authorization', 'Bearer $S{userAt}')
      .expectStatus(200);
  });
  it('Should delete a car with id 1', () => {
    return pactum
      .spec()
      .delete('/car/1')
      .withHeaders('Authorization', 'Bearer $S{userAt}')
      .expectStatus(204);
  });
});
