import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { LicenseService } from './license.service';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { DataResultInterface, ListInterface } from '../../core/interfaces/all.interface';
import {
  ApproveLicenseDto,
  AttachFilesDto,
  ExpireLicenseDto,
  LicenseStatsDto,
  LicenseStatsWithYearDto,
  MobileRenewalLicenseRequestDto,
  MobileReplaceLicenseRequestDto,
  NewLicenseRequestDto,
  PreRegistrationRequestDto,
  RenewalLicenseRequestDto,
  RenewalPreRegistrationDto,
  ReplaceLicenseRequestDto,
  UpdateLicenseDto,
  ValidateLicenseDto,
} from './license.dto';
import { ApplicationNoDto, LicenseNoDto } from '../../core/interfaces/all.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AllowedRoles, Role } from '../../middlewares/roles';

@Controller('license')
export class LicenseController {
  constructor(private readonly service: LicenseService) {}

  @ApiOperation({
    summary: 'Calculates total licenses, renewed, replaced, and expired licenses.',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Get('/dashboard/summary')
  getLicenseSummary() {
    return this.service.getLicenseSummary();
  }

  @ApiOperation({
    summary: 'Monthly license volume for current year.',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Get('/dashboard/monthly-volume')
  getMonthlyLicenseVolume(@Query() data: LicenseStatsWithYearDto) {
    return this.service.getMonthlyLicenseVolume(data);
  }

  @ApiOperation({
    summary: 'Calculates the renewal rate as a percentage.',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Get('/dashboard/renewal-rate')
  getRenewalRate(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.service.getRenewalRate(new Date(startDate), new Date(endDate));
  }

  @ApiOperation({
    summary: ' Fetches the top 5 states with the most expired licenses.',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Get('/dashboard/top-expired-lgas')
  getTopExpiredLicensesByState(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.service.getTopExpiredLicensesByLga(new Date(startDate), new Date(endDate));
  }

  @ApiOperation({
    summary: 'Fetches gender distribution within a date range.',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Get('/dashboard/gender-distribution')
  getGenderDistribution(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.service.getGenderDistribution(new Date(startDate), new Date(endDate));
  }

  @ApiOperation({
    summary: 'Get license stats',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Get('/stats')
  async stats(@Query() type: LicenseStatsDto, @Req() req: any): Promise<DataResultInterface> {
    return await this.service.stats(type, req.user);
  }

  @ApiOperation({
    summary: 'Get all licenses',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Get()
  async findAll(@Query() data: ListInterface, @Req() req: any): Promise<DataResultInterface> {
    return await this.service.findAll(data, req.user);
  }

  @ApiOperation({
    summary: 'Get all pre registrations',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Get('/pre-registrations')
  async preRegistrations(
    @Query() data: ListInterface,
    @Req() req: any,
  ): Promise<DataResultInterface> {
    return await this.service.preRegistrations(data, req.user);
  }

  @ApiOperation({
    summary: 'Get license details by application id',
  })
  @Post('/details')
  async details(@Body() data: ApplicationNoDto): Promise<DataResultInterface> {
    return await this.service.details(data);
  }

  @ApiOperation({
    summary: 'Get license details by license number',
  })
  @Post('/details-by-license-no')
  async detailsByLicenseNo(@Body() data: LicenseNoDto): Promise<DataResultInterface> {
    return await this.service.detailsByLicenseNo(data);
  }

  @ApiOperation({
    summary: 'Verify license',
  })
  @Post('/verify')
  async verifyLicense(@Body() data: ValidateLicenseDto): Promise<DataResultInterface> {
    return await this.service.verifyLicense(data);
  }

  @ApiOperation({
    summary: 'Submit pre registration for license request',
  })
  @ApiBody({
    type: PreRegistrationRequestDto,
  })
  @Post('/pre-registration')
  async preRegistration(
    @Body() data: PreRegistrationRequestDto,
    @Req() req: any,
  ): Promise<DataResultInterface> {
    return await this.service.preRegistration(data, req);
  }

  @ApiOperation({
    summary: 'Get pre registration data by applicationNo',
  })
  @Post('/single/pre-registration')
  async getPreRegistration(
    @Body('applicationNo') applicationNo: string,
  ): Promise<DataResultInterface> {
    return await this.service.getPreRegistration(applicationNo);
  }

  @ApiOperation({
    summary: 'Get pre-registration details by student id',
  })
  @Get('/single/pre-registration/:studentId')
  async preRegistrationDetailsByStudent(
    @Param('studentId') studentId: number,
  ): Promise<DataResultInterface> {
    return await this.service.preRegistrationDetailsByStudent(studentId);
  }

  @ApiOperation({
    summary: 'Submit new license request',
  })
  @ApiBody({
    type: NewLicenseRequestDto,
  })
  @Post('/submit-new-request')
  async submitNewRequest(@Body() data: NewLicenseRequestDto): Promise<DataResultInterface> {
    return await this.service.submitNewRequest(data);
  }

  @ApiOperation({
    summary: 'Submit pre registration for license renewal request',
  })
  @ApiBody({
    type: RenewalPreRegistrationDto,
  })
  @Post('/pre-registration/renewal')
  async licenseRenewalPreRegistration(
    @Body() data: RenewalPreRegistrationDto,
    @Req() req: any,
  ): Promise<DataResultInterface> {
    return await this.service.licenseRenewalPreRegistration(data, req);
  }

  @ApiOperation({
    summary: 'Submit renewal license request',
  })
  @ApiBody({
    type: RenewalLicenseRequestDto,
  })
  @Post('/submit-renewal-request')
  async submitRenewalRequest(
    @Body() data: RenewalLicenseRequestDto,
    @Req() req: any,
  ): Promise<DataResultInterface> {
    return await this.service.submitRenewalRequest(data, req);
  }

  @ApiOperation({
    summary: 'Submit renewal license request for mobile',
  })
  @ApiBody({
    type: MobileRenewalLicenseRequestDto,
  })
  @Post('/mobile/submit-renewal-request')
  async mobileSubmitRenewalRequest(
    @Body() data: MobileRenewalLicenseRequestDto,
    @Req() req: any,
  ): Promise<DataResultInterface> {
    return await this.service.mobileSubmitRenewalRequest(data, req);
  }

  @ApiOperation({
    summary: 'Submit replacement license request',
  })
  @ApiBody({
    type: ReplaceLicenseRequestDto,
  })
  @Post('/submit-replacement-request')
  async submitReplacementRequest(
    @Body() data: ReplaceLicenseRequestDto,
    @Req() req: any,
  ): Promise<DataResultInterface> {
    return await this.service.submitReplacementRequest(data, req);
  }

  @ApiOperation({
    summary: 'Submit replacement license request for mobile',
  })
  @ApiBody({
    type: MobileReplaceLicenseRequestDto,
  })
  @Post('/mobile/submit-replacement-request')
  async mobileSubmitReplacementRequest(
    @Body() data: MobileReplaceLicenseRequestDto,
    @Req() req: any,
  ): Promise<DataResultInterface> {
    return await this.service.mobileSubmitReplacementRequest(data, req);
  }

  @ApiOperation({
    summary: 'Submit pre-registration files (biometrics) to license applications',
  })
  @ApiBody({
    type: AttachFilesDto,
  })
  @Post('/submit-pre-registration-files')
  async submitPreRegistrationFiles(@Body() data: AttachFilesDto): Promise<DataResultInterface> {
    return await this.service.submitPreRegistrationFiles(data);
  }

  @ApiOperation({
    summary: 'Approve license',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Post('/approve')
  async approveLicense(
    @Body() data: ApproveLicenseDto,
    @Req() req: any,
  ): Promise<DataResultInterface> {
    return await this.service.approveLicense(data, req.user);
  }

  @ApiOperation({
    summary: 'Update license details',
  })
  @UseGuards(JwtAuthGuard)
  @AllowedRoles(Role.Admin, Role.MVAA_ADMIN)
  @ApiBearerAuth()
  @Post('/update')
  async updateLicense(@Body() data: UpdateLicenseDto): Promise<DataResultInterface> {
    return await this.service.updateLicense(data);
  }

  @ApiOperation({
    summary: 'Expire License [TEST]',
  })
  @Post('/expire')
  async expireLicense(@Body() data: ExpireLicenseDto): Promise<DataResultInterface> {
    return await this.service.expireLicense(data);
  }
}
