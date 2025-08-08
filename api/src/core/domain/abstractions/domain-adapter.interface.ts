export interface DomainAdapter<TDomain, TExternal> {
  toDomain(input: TExternal): TDomain;
  fromDomain(input: TDomain): TExternal;
}
