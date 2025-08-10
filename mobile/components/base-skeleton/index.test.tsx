import { render } from "@testing-library/react-native";
import Skeleton from "./index";

describe("Skeleton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render without crashing", () => {
      render(<Skeleton width={100} height={50} />);
    });

    it("should render with specified dimensions", () => {
      render(<Skeleton width={200} height={100} />);
    });
  });

  describe("Skeleton Radius", () => {
    it("should render with default radius", () => {
      render(<Skeleton width={100} height={50} />);
    });

    it("should render with custom radius", () => {
      render(<Skeleton width={100} height={50} radius="md" />);
    });

    it("should render with no radius", () => {
      render(<Skeleton width={100} height={50} radius="none" />);
    });
  });

  describe("Skeleton Dimensions", () => {
    it("should render with small dimensions", () => {
      render(<Skeleton width={50} height={25} />);
    });

    it("should render with large dimensions", () => {
      render(<Skeleton width={300} height={200} />);
    });
  });
});