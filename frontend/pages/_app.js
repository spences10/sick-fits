import App, { Container } from 'next/app'
import Page from '../components/Page'
import { GlobalStyle } from '../components/Page'

class MyApp extends App {
  render() {
    const { Component } = this.props
    return (
      <Container>
        <GlobalStyle />
        <Page>
          <Component />
        </Page>
      </Container>
    )
  }
}

export default MyApp
