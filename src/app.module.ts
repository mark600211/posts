import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          autoLoadEntities: true,
          logging: false,
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: `${__dirname}/schema.gql`,
      context: ({ req }) => ({ req }),
      tracing: true,
      playground: true,
    }),
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
