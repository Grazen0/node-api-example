import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller('anime')
export class AnimeController {
  public constructor(private readonly animeService: AnimeService) {}

  @Post()
  public async create(@Body() createAnimeDto: CreateAnimeDto) {
    return await this.animeService.create(createAnimeDto);
  }

  @Get()
  public async findAll() {
    return await this.animeService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const anime = await this.animeService.findById(+id);

    if (!anime) {
      return {
        status: 404,
        message: 'Anime Not Found.',
      };
    }

    return anime;
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateAnimeDto: UpdateAnimeDto,
  ) {
    const anime = await this.animeService.updateById(+id, updateAnimeDto);

    if (!anime) {
      return {
        status: 404,
        message: 'Anime Not Found.',
      };
    }

    return anime;
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    const wasDeleted = await this.animeService.removeById(+id);

    if (!wasDeleted) {
      return {
        status: 404,
        message: 'Anime Not Found.',
      };
    }
  }
}
