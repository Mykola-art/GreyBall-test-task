import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { renderVoyagerPage } from 'graphql-voyager/middleware';

@Controller('voyager')
export class GraphQLVoyagerController {
  @Get()
  renderVoyager(@Res() res: Response) {
    const voyagerPage = renderVoyagerPage({
      endpointUrl: 'http://localhost:5001/graphql',
    });
    res.send(voyagerPage);
  }
}
