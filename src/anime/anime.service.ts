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

  public async create(createAnimeDto: CreateAnimeDto): Promise<Anime> {
    return await this.animeRepository.save(createAnimeDto);
  }

  public async findAll(): Promise<Anime[]> {
    return await this.animeRepository.find();
  }

  public async findById(id: number): Promise<Anime | null> {
    return await this.animeRepository.findOneBy({ id });
  }

  public async existsById(id: number): Promise<boolean> {
    return await this.animeRepository.existsBy({ id });
  }

  public async updateById(
    id: number,
    updateAnimeDto: UpdateAnimeDto,
  ): Promise<Anime | null> {
    if (!(await this.existsById(id))) return null;

    return await this.animeRepository.save({ id, ...updateAnimeDto });
  }

  public async removeById(id: number): Promise<boolean> {
    if (!(await this.existsById(id))) return false;

    await this.animeRepository.delete({ id });
    return true;
  }
}
