import { MinimalOrganizationDto } from "@/modules/organizations/application/dtos/organization.dto";

export interface ExpandableMinimalOrganization {
  organization?: MinimalOrganizationDto | null;
}
