import { GetMovie_movie_cast } from "../graphql/types/GetMovie";
import { EGender } from "../types/gender";

class Actor implements GetMovie_movie_cast {
  // tslint:disable-next-line
  public readonly __typename: "Cast" = "Cast";
  public readonly character: string;
  public readonly gender: EGender;
  public readonly name: string;
  public readonly order: number;

  public constructor(props: GetMovie_movie_cast) {
    this.character = props.character;
    this.name = props.name;
    this.order = props.order;
    this.gender = props.gender === null ? EGender.UNKNOWN : props.gender;
  }

  public get isMale() {
    return this.gender === EGender.MALE;
  }

  public get isFemale() {
    return this.gender === EGender.FEMALE;
  }

  public get genderUnknown() {
    return this.gender === EGender.UNKNOWN;
  }

}

export default Actor;
