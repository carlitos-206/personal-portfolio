# This file holds a global function to convert current time to a PST timezone
from datetime import datetime
from pytz import timezone
import pytz


def get_today_pst():
    date_format='%m/%d/%Y %H:%M:%S %Z'
    date = datetime.now(tz=pytz.utc)
    date = date.astimezone(timezone('US/Pacific'))
    return date.strftime(date_format)