from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.ext.hybrid import hybrid_method

db = SQLAlchemy()


class BaseMixin(object):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())


class User(db.Model, BaseMixin):
    __tablename__ = 'user'
    name = db.Column(db.Unicode(50), nullable=False)
    phone = db.Column(db.Unicode(20))
    avatar_url = db.Column(db.Unicode(255))

    @hybrid_method
    def to_dict(self):
        return dict(
            id=self.id,
            name=self.name,
            phone=self.phone,
            avatarUrl=self.avatar_url
        )


class Campaign(db.Model, BaseMixin):
    __tablename__ = 'campaign'

    name = db.Column(db.Unicode(50), nullable=False)


class Advertiser(db.Model, BaseMixin):
    __tablename__ = 'advertiser'

    name = db.Column(db.Unicode(50), nullable=False)


class CampaignAdvertiser(db.Model, BaseMixin):
    __tablename__ = 'campaign_advertiser'

    campaign_id = db.Column(db.Integer, db.ForeignKey('campaign.id'))
    advertiser_id = db.Column(db.Integer, db.ForeignKey('advertiser.id'))

    campaign = db.relationship('Campaign', backref=db.backref('advertisers'))
    advertiser = db.relationship('Advertiser', backref=db.backref('campaigns'))
