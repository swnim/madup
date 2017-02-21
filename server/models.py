from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.ext.hybrid import hybrid_method

db = SQLAlchemy()


class BaseMixin(object):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())


class User(db.Model, BaseMixin):
    __tablename__ = 'users'

    email = db.Column(db.Unicode(255), nullable=False)
    encrypted_password = db.Column(db.Unicode(255), nullable=False)
    is_admin = db.Column(db.Integer)
    reset_password_token = db.Column(db.Unicode(255))
    reset_password_sent_at = db.Column(db.DateTime)
    sign_in_count = db.Column(db.Integer, nullable=False)
    current_sign_in_at = db.Column(db.DateTime)
    last_sign_in_at = db.Column(db.DateTime)
    current_sign_in_ip = db.Column(db.Unicode(255))
    last_sign_in_ip = db.Column(db.Unicode(255))
    role = db.Column(db.Integer)
    affiliate_id = db.Column(db.Integer)
    advertiser_id = db.Column(db.Integer)
    usertype = db.Column(db.Integer)
    username = db.Column(db.Unicode(255))
    company = db.Column(db.Unicode(255))

    @hybrid_method
    def to_dict(self):
        return dict(
            id=self.id,
            email=self.email,
            username=self.username,
            current_ip=self.current_sign_in_ip
        )


class Advertiser(db.Model, BaseMixin):
    __tablename__ = 'advertisers'

    name = db.Column(db.Unicode(255))
    icon_file_name = db.Column(db.Unicode(255))
    icon_content_type = db.Column(db.Unicode(255))
    icon_file_size = db.Column(db.Integer)
    icon_updated_at = db.Column(db.DateTime)
    install = db.Column(db.Integer)
    price_advertiser = db.Column(db.BigInteger)
    price_affiliate = db.Column(db.BigInteger)


class Affiliate(db.Model, BaseMixin):
    __tablename__ = 'affiliates'

    name = db.Column(db.Unicode(255))
    code = db.Column(db.Unicode(255))
    install = db.Column(db.Integer)
    price_advertiser = db.Column(db.BigInteger)
    price_affiliate = db.Column(db.BigInteger)
    icon_file_name = db.Column(db.Unicode(255))
    icon_content_type = db.Column(db.Unicode(255))
    icon_file_size = db.Column(db.Integer)
    icon_updated_at = db.Column(db.DateTime)


class Platform(db.Model, BaseMixin):
    __tablename__ = 'platforms'

    name = db.Column(db.Unicode(255))
    icon_file_name = db.Column(db.Unicode(255))
    icon_content_type = db.Column(db.Unicode(255))
    icon_file_size = db.Column(db.Integer)
    icon_updated_at = db.Column(db.DateTime)


class Campaign(db.Model, BaseMixin):
    __tablename__ = 'campaigns'

    platform_id = db.Column(db.Integer, db.ForeignKey('platforms.id'))
    advertiser_id = db.Column(db.Integer, db.ForeignKey('advertisers.id'))
    install = db.Column(db.Integer)
    price_advertiser = db.Column(db.BigInteger)
    price_affiliate = db.Column(db.BigInteger)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    description = db.Column(db.UnicodeText)

    platform = db.relationship('Platform', backref=db.backref('campaigns'))
    advertiser = db.relationship('Advertiser', backref=db.backref('campaigns'))


class Integration(db.Model, BaseMixin):
    __tablename__ = 'integrations'

    integration_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    camaffiliate_id = db.Column(db.Integer)
    name = db.Column(db.Unicode(255))
    affiliate = db.Column(db.Unicode(255))
    tracking = db.Column(db.Unicode(255))
    index_number = db.Column(db.Integer)
    madup_url = db.Column(db.Unicode(255))

    campaign = db.relationship('Campaign', backref=db.backref('integrations'))


class CampaignAffiliate(db.Model, BaseMixin):
    __tablename__ = 'camaffiliates'

    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    affiliate_id = db.Column(db.Integer, db.ForeignKey('affiliates.id'))
    integration_id = db.Column(db.Integer, db.ForeignKey('integrations.id'))
    install = db.Column(db.Integer)
    price_advertiser = db.Column(db.BigInteger)
    price_affiliate = db.Column(db.BigInteger)

    campaign = db.relationship('Campaign', backref=db.backref('camaffiliates'))
    affiliate = db.relationship('Affiliate', backref=db.backref('camaffiliates'))
    integration = db.relationship('Integration', backref=db.backref('camaffiliates'))


class Currency(db.Model, BaseMixin):
    __tablename__ = 'currencies'

    unit = db.Column(db.Integer)


class Daily(db.Model, BaseMixin):
    __tablename__ = 'dailies'

    day = db.Column(db.DateTime)
    install = db.Column(db.Integer)
    price_advertiser = db.Column(db.BigInteger)
    price_affiliate = db.Column(db.BigInteger)


class DailyCampaign(db.Model, BaseMixin):
    __tablename__ = 'dailycams'

    camaffiliate_id = db.Column(db.Integer, db.ForeignKey('camaffiliates.id'))
    affiliate_id = db.Column(db.Integer, db.ForeignKey('affiliates.id'))
    daily_id = db.Column(db.Integer, db.ForeignKey('dailies.id'))
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    day = db.Column(db.DateTime)
    install = db.Column(db.Integer)
    unit_advertiser = db.Column(db.Integer)
    unit_affiliate = db.Column(db.Float)
    price_advertiser = db.Column(db.BigInteger)
    price_affiliate = db.Column(db.BigInteger)

    camaffiliate = db.relationship('CampaignAffiliate', backref=db.backref('dailycams'))
    affiliate = db.relationship('Affiliate', backref=db.backref('dailycams'))
    daily = db.relationship('Daily', backref=db.backref('dailycams'))
    campaign = db.relationship('Campaign', backref=db.backref('dailycams'))
    user = db.relationship('User', backref=db.backref('dailycams'))


class DailyMemo(db.Model, BaseMixin):
    __tablename__ = 'dailymemos'

    daily_id = db.Column(db.Integer, db.ForeignKey('dailies.id'))
    dailycam_id = db.Column(db.Integer, db.ForeignKey('dailycams.id'))
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    camaffiliate_id = db.Column(db.Integer, db.ForeignKey('camaffiliates.id'))
    content = db.Column(db.Unicode(255))
    long_content = db.Column(db.UnicodeText)

    daily = db.relationship('Daily', backref=db.backref('dailymemos'))
    dailycam = db.relationship('DailyCampaign', backref=db.backref('dailymemos'))
    campaign = db.relationship('Campaign', backref=db.backref('dailymemos'))
    camaffiliate = db.relationship('CampaignAffiliate', backref=db.backref('dailymemos'))


class Owner(db.Model, BaseMixin):
    __tablename__ = 'owners'

    name = db.Column(db.Unicode(255))
    network_id = db.Column(db.Unicode(255))
    network_token = db.Column(db.Unicode(255))
    advertiser_id = db.Column(db.Integer, db.ForeignKey('advertisers.id'))
    secret_key = db.Column(db.Unicode(255))

    advertiser = db.relationship('Advertiser', backref=db.backref('owners'))


class Offer(db.Model, BaseMixin):
    __tablename__ = 'offers'

    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))
    campid = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    note = db.Column(db.UnicodeText)
    name = db.Column(db.Unicode(255))
    url = db.Column(db.Unicode(255))

    owner = db.relationship('Owner', backref=db.backref('offers'))
    campaign = db.relationship('Campaign', backref=db.backref('offers'))


class SchemaMigration(db.Model):
    __tablename__ = 'schema_migrations'

    version = db.Column(db.Integer, primary_key=True)
