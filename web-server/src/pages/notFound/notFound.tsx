import { Wrapper, MessageText } from "./notFound.style";

const NotFound = () => {
  const notFoundMessage: string = "Page not found :( ...";

  return (
    <Wrapper>
      <MessageText>{notFoundMessage}</MessageText>
    </Wrapper>
  );
};

export default NotFound;
