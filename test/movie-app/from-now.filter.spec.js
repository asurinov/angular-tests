/**
 * Created by Machete on 31.03.2016.
 */
describe('From now filter', function(){
    var fromNow;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$filter_){
        fromNow = _$filter_('fromNow');
    }));

    it('should return throw error for undefined', function(){
        expect(fromNow).toThrow('date value cannot be undefined');
    });

    it('should return same value for invalid date', function(){
        expect(fromNow('foo')).toBe('foo');
    });

    it('should return value of years ago for date object', function(){
        var value = new angular.mock.TzDate(0, '2013-07-01T00:00:00.000Z');
        var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
        expect(fromNow(value, baseDate)).toBe('2 years ago');
    });

    it('should return value of one year ago', function(){
        var value = new angular.mock.TzDate(0, '2014-07-01T00:00:00.000Z');
        var baseDate = new angular.mock.TzDate(0, '2015-08-01T21:00:00.000Z');
        expect(fromNow(value, baseDate)).toBe('1 year ago');
    });
});