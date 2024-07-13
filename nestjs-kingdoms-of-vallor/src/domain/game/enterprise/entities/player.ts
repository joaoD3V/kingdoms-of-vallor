import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { Username } from './value-objects/username';

export interface PlayerProps {
  name: string;
  username: Username;
  email: string;
  password: string;
  avatar: string;
  isVerified: boolean;
  currentLevel: number;
  experienceAmount: number;
  masteryAmount: number;
}

export class Player extends Entity<PlayerProps> {
  get name() {
    return this.props.name;
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get avatar() {
    return this.props.avatar;
  }

  get isVerified() {
    return this.props.isVerified;
  }

  get currentLevel() {
    return this.props.currentLevel;
  }

  get experienceAmount() {
    return this.props.experienceAmount;
  }

  get masteryAmount() {
    return this.props.masteryAmount;
  }

  static create(props: PlayerProps, id?: UniqueEntityID) {
    const player = new Player(props, id);

    return player;
  }
}
