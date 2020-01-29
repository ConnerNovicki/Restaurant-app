import startServer from './startServer'
import { Photon } from '@prisma/photon';

const photon = new Photon();
startServer(photon);