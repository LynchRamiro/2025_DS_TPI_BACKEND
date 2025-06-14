import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MenuInput } from './dto';
import { MenuService } from './menu.service';
import { RemoteAuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';

@Controller('menu')
export class MenuController {
    menuService: MenuService;
        constructor(menuService: MenuService) {
            this.menuService = menuService;
        }

        @UseGuards(RemoteAuthGuard)
        @Permissions(['menu_edit'])
        @Post()
        newMenu(@Body() menu: MenuInput){
            return this.menuService.newMenu(menu);
        }
        @Get()
        getAllMenu(@Query('page') page: number = 1, @Query('quantity') quantity: number = 10) {
            return this.menuService.getAllMenu(+page, +quantity);
        }
        @Get(':id')
        getMenuById(@Param('id') id: number) {
            return this.menuService.getMenuById(id);
        }

        @UseGuards(RemoteAuthGuard)
        @Permissions(['menu_edit'])
        @Put(':id')
        updateMenu(@Param('id') id: number, @Body() menu: MenuInput) {
            return this.menuService.updateMenu(id, menu);
        }

        @UseGuards(RemoteAuthGuard)
        @Permissions(['menu_edit'])
        @Patch(':id')
        partialUpdateMenu(@Param('id') id: number, @Body() menu: Partial<MenuInput>) {
            return this.menuService.partialUpdateMenu(id, menu);
        }

        @UseGuards(RemoteAuthGuard)
        @Permissions(['menu_edit'])
        @Delete(':id')
        deleteMenu(@Param('id') id: number) {
            return this.menuService.deleteMenuById(id);
        }
}
