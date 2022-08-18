import { Panel, PanelGroup, Row, Col, Divider } from 'rsuite';

const Advert = ({ _id, title, description, pubDate, price, image, address, user }) => {
  return (
    <div>
      <Row>
        <PanelGroup bordered>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Panel bodyFill style={{ display: 'inline-block', width: '240px' }}>
              <img src={image} height="240" alt={title} />
              <Panel header={title}>
                <p>
                  <small>{description}</small>
                </p>
              </Panel>
            </Panel>
          </Col>

          <Col xs={12} sm={12} md={12} lg={12}>
            <Panel header="Date">
              <p>{pubDate}</p>
            </Panel>
            <Panel header="Price">
              <p>{price}</p>
            </Panel>
            <Panel header="Address">
              <p>{address}</p>
            </Panel>
            <Panel header="User">
              <p>{user}</p>
            </Panel>
          </Col>
        </PanelGroup>
      </Row>
    </div>
  );
};

export default Advert;
