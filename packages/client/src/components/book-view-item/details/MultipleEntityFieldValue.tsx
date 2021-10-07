import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

import { DetailsItemFieldRenderProps } from './details.types';
import DetailsItemPrintText from './DetailsItemPrintText';
import DetailsItemLabel from './DetailsItemLabel';

const MultipleEntityValue: React.FC<DetailsItemFieldRenderProps> = ({ title, entityValues, entityList }) => {
  return (
    <>
      <Accordion className="book-view_details-authors-menu">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Authors: </Accordion.Header>
          <Accordion.Body>
            {entityList && (
              <ul>
                {entityList.map(entity => {
                  return <li key={entity.id}>{entity.name}</li>;
                })}{' '}
              </ul>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <li className="book-view__details-list-item book-view__details-authors-info">
        <DetailsItemLabel text={title} />
        <DetailsItemPrintText text={entityValues} />
      </li>
    </>
  );
};

export default MultipleEntityValue;
