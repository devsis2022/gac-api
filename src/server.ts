import 'reflect-metadata'
import dotenv from 'dotenv'
import { Application } from './config/application'

dotenv.config()

const server = new Application()

server.init()
