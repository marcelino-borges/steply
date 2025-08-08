import { DatabaseDates } from "./database-dates.interface";
import { DatabaseId } from "./database-id.interface";

export interface DatabaseRecord extends DatabaseId, DatabaseDates {}
