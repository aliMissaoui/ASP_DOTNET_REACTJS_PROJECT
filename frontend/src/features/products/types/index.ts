import type { BaseEntity, Money } from "@/types";

export type ProductDto = {
  name: string;
  code: string;
  description: string;
  pictureUrl: string;
  defaultPrice: Money;
  branchId: string;
  branchName: string;
  type: string;
} & BaseEntity;

export type ProductBriefDto = {
  name: string;
  pictureUrl: string;
  localSeller: boolean;
  branchCity: string;
  salesNumber: number;
  defaultPrice: Money;
  isLikedByTheUser: boolean;
} & BaseEntity;

export type ProductBranchBriefInfoDto = {
  pictureUrl: string;
  name: string;
  reviewsCount: number;
  productsCount: number;
} & BaseEntity;

export type ImageDto = {
  name: string;
  url: string;
  isMain: boolean;
} & BaseEntity;
