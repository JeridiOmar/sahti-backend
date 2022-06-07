import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import * as bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { RoleEnum } from './entities/role.enum';
import { CivilStatusEnum } from './entities/civil-status.enum';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';

describe('PatientService', () => {
  let service: PatientService;
  let patientRepository: Repository<Patient>;
  const patients: Patient[] = [
    {
      id: 1,
      email: 'amrouch_jridi@hotmail.fraa',
      role: 'Patient',
      firstName: 'omar',
      lastName: 'jridi',
      birthday: new Date('2000-05-01'),
      cin: '21111115',
      gender: 0,
      phoneNumber: '55479319',
      civilStatus: 'Married',
      socialStatus: 'working',
      cnamId: 1800,
      password: 'azerty',
      isEmailVerified: false,
      medicalRecord: null,
      async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
      },
      emailToLowerCase() {
        this.email = this.email.toLowerCase().trim();
      },
      toJSON() {
        return classToPlain(this);
      },
    } as Patient,
  ];
  const dtos = [
    {
      dto: {
        email: 'amrouch_jridi@hotmail.fraa',
        role: RoleEnum.PATIENT,
        firstName: 'omar',
        lastName: 'jridi',
        birthday: new Date('2000-05-01'),
        cin: '21111115',
        gender: 0,
        phoneNumber: '55479319',
        civilStatus: CivilStatusEnum.MARRIED,
        socialStatus: 'working',
        cnamId: 1800,
        password: 'azerty',
        isEmailVerified: false,
        medicalRecord: null,
        async hashPassword() {
          const salt = await bcrypt.genSalt();
          this.password = await bcrypt.hash(this.password, salt);
        },
        emailToLowerCase() {
          this.email = this.email.toLowerCase().trim();
        },
        toJSON() {
          return classToPlain(this);
        },
      },
      expectedResult: patients[0],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<PatientService>(PatientService);
    patientRepository = module.get('PatientRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(patientRepository).toBeDefined();
  });
  it('should return the list of all patients', async () => {
    const allPatients = await service.findAll();
    expect(allPatients.length).toEqual(0);
  });
});
