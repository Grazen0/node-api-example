import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './entities/anime.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime) private animeRepository: Repository<Anime>,
  ) {}

  create(createAnimeDto: CreateAnimeDto) {
    return this.animeRepository.save(createAnimeDto);
  }

  findAll() {
    return this.animeRepository.find();
  }

  findById(id: number) {
    return this.animeRepository.findOneBy({ id });
  }

  existsById(id: number) {
    return this.animeRepository.findOneBy({ id });
  }

  updateById(id: number, updateAnimeDto: UpdateAnimeDto) {
    return this.animeRepository.update({ id }, updateAnimeDto);
  }

  async removeById(id: number) {
    if (!(await this.existsById(id))) return false;

    await this.animeRepository.delete({ id });
    return true;
  }
}
