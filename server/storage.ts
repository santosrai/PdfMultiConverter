import { 
  ConversionJob, 
  InsertConversionJob, 
  User, 
  InsertUser, 
  conversionJobs
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Conversion job methods
  getConversionJob(id: number): Promise<ConversionJob | undefined>;
  getAllConversionJobs(): Promise<ConversionJob[]>;
  createConversionJob(job: InsertConversionJob): Promise<ConversionJob>;
  updateConversionJob(id: number, updates: Partial<ConversionJob>): Promise<ConversionJob>;
  deleteConversionJob(id: number): Promise<boolean>;
  
  // Stats methods
  getStats(): Promise<{ filesConverted: number; happyUsers: number }>;
  incrementFilesConverted(): Promise<void>;
  incrementHappyUsers(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private conversions: Map<number, ConversionJob>;
  private userId: number;
  private conversionId: number;
  private stats: { filesConverted: number; happyUsers: number };

  constructor() {
    this.users = new Map();
    this.conversions = new Map();
    this.userId = 1;
    this.conversionId = 1;
    this.stats = { filesConverted: 2500000, happyUsers: 150000 }; // Starting values
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getConversionJob(id: number): Promise<ConversionJob | undefined> {
    return this.conversions.get(id);
  }
  
  async getAllConversionJobs(): Promise<ConversionJob[]> {
    return Array.from(this.conversions.values());
  }
  
  async createConversionJob(job: InsertConversionJob): Promise<ConversionJob> {
    const id = this.conversionId++;
    const now = new Date();
    
    const conversionJob: ConversionJob = {
      ...job,
      id,
      status: "queued",
      progress: 0,
      createdAt: now,
      updatedAt: now,
    };
    
    this.conversions.set(id, conversionJob);
    return conversionJob;
  }
  
  async updateConversionJob(id: number, updates: Partial<ConversionJob>): Promise<ConversionJob> {
    const job = this.conversions.get(id);
    
    if (!job) {
      throw new Error(`Conversion job with id ${id} not found`);
    }
    
    const updatedJob: ConversionJob = {
      ...job,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.conversions.set(id, updatedJob);
    return updatedJob;
  }
  
  async deleteConversionJob(id: number): Promise<boolean> {
    return this.conversions.delete(id);
  }
  
  async getStats(): Promise<{ filesConverted: number; happyUsers: number }> {
    return { ...this.stats };
  }
  
  async incrementFilesConverted(): Promise<void> {
    this.stats.filesConverted++;
  }
  
  async incrementHappyUsers(): Promise<void> {
    this.stats.happyUsers++;
  }
}

export const storage = new MemStorage();
