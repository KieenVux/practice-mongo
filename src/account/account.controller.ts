import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { AccountService } from './account.service';
import { Account, Role, UpdateAccountDTO } from './entities/account.entity';

@ApiTags('account')
@Controller('account')
@ApiBearerAuth()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Public()
  @Post()
  @ApiQuery({ name: 'role', enum: Role })
  create(@Body() createAccountDto: Account, @Query('role') role: Role) {
    createAccountDto.role = role;
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.accountService.getAllItem();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.getAItemByID(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDTO: UpdateAccountDTO) {
    return this.accountService.updateItemByID(id, updateAccountDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.deleteItemById(id);
  }
}
