import { ApiProperty } from '@nestjs/swagger';

export enum TaskPriority {
  Baja = 'Baja',
  Media = 'Media',
  Alta = 'Alta',
}

export class TaskModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: TaskPriority })
  priority: TaskPriority;

  @ApiProperty()
  is_complete: boolean;
}
