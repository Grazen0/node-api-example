import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './entities/anime.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnimeService {
  public constructor(
    @InjectRepository(Anime)
    private readonly animeRepository: Repository<Anime>,
  ) {}

  public async create(createAnimeDto: CreateAnimeDto) {
    return await this.animeRepository.save(createAnimeDto);
  }

  public async findAll() {
    return await this.animeRepository.find();
  }

  public async findById(id: number) {
    return await this.animeRepository.findOneBy({ id });
  }

  public async existsById(id: number) {
    return await this.animeRepository.findOneBy({ id });
  }

  public async updateById(id: number, updateAnimeDto: UpdateAnimeDto) {
    return await this.animeRepository.update({ id }, updateAnimeDto);
  }

  public async removeById(id: number) {
    if (!(await this.existsById(id))) return false;

    await this.animeRepository.delete({ id });
    return true;
  }
}
