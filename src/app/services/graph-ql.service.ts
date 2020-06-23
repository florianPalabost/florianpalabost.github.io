import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  async retrieveProjects() {
    this.apollo.removeClient();
    const client = new ApolloClient({
      link: createHttpLink({ uri: 'http://localhost:3003/api/v1' }),
      cache: new InMemoryCache()
    });
    this.apollo.setClient(client);
    const PROJECTS_QUERY = gql`
      {
        projects {
          id
          title
          description
          technos
          img
          url
          anneeReal
        }
      }
    `;
    return await this.apollo
      .query({
        query: PROJECTS_QUERY
      })
      .toPromise();
  }

  async uploadImage(file: File) {
    const client = new ApolloClient({
      link: createUploadLink({ uri: 'http://localhost:3003/api/v1/upload' }),
      cache: new InMemoryCache()
    });
    this.apollo.removeClient();
    this.apollo.setClient(client);
    const UPLOAD_QUERY = gql`
      mutation uploadImage($file: Upload!) {
        uploadImage(file: $file) {
          name
          type
          size
        }
      }
    `;
    return await this.apollo
      .mutate({
        mutation: UPLOAD_QUERY,
        variables: {
          file
        },
        context: {
          useMultipart: true
        }
      })
      .toPromise();
  }

  async createProject(form) {
    this.apollo.removeClient();
    const client = new ApolloClient({
      link: createHttpLink({ uri: 'http://localhost:3003/api/v1' }),
      cache: new InMemoryCache()
    });
    this.apollo.setClient(client);
    const ADD_PROJECT_QUERY = gql`
      mutation {
        addProject(
        id: "${form.id}",
        title: "${form.title}",
        description: "${form.description}",
        img: "${form.img}"
        technos: "${form.technos}"
        ) {
          title
        }
      }
    `;
    return await this.apollo
      .mutate({
        mutation: ADD_PROJECT_QUERY
      })
      .toPromise();
  }
}
