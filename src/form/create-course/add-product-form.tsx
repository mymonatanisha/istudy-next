"use client";

type AddProductFormProps = {
    courseType?: 'paid' | 'free';
    regularPrice?: string;
    salePrice?: string;
    onCourseTypeChange?: (value: 'paid' | 'free') => void;
    onPriceChange?: (field: 'regularPrice' | 'salePrice', value: string) => void;
};

const AddProductForm = ({
    courseType = 'paid',
    regularPrice = '',
    salePrice = '',
    onCourseTypeChange,
    onPriceChange,
}: AddProductFormProps) => {

    const selectHandler = () => { }
    return (
        <>
            <div className="bd-course-product">
                <div className="bd-course-product-item">
                    <div className="bd-course-product-left">
                        <p className="title b3">Course Type</p>
                    </div>
                    <div className="bd-course-product-right">
                        <div className="radio d-flex-items gap-30">
                            <div className="form-check">
                                <input
                                    name="default-radio-1"
                                    className="form-check-input"
                                    type="radio"
                                    id="defaultRadio1"
                                    checked={courseType === 'paid'}
                                    onChange={() => onCourseTypeChange?.('paid')}
                                />
                                <label className="form-check-label" htmlFor="defaultRadio1">
                                    Paid
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    name="default-radio-1"
                                    className="form-check-input"
                                    type="radio"
                                    id="defaultRadio2"
                                    checked={courseType === 'free'}
                                    onChange={() => onCourseTypeChange?.('free')}
                                />
                                <label className="form-check-label" htmlFor="defaultRadio2">
                                    Free
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bd-course-product-item">
                    <div className="bd-course-product-left">
                        <p className="title b3">Select product</p>
                    </div>
                    <div className="bd-course-product-right">
                        <div className="bd-new-course-input-level">
                            <NiceSelect
                                options={courseLavel}
                                defaultCurrent={0}
                                onChange={selectHandler}
                                filterIcon={false}
                                name=""
                                className="course-name"
                            />
                        </div>
                    </div>
                </div>
                <div className="bd-course-product-item">
                    <div className="bd-course-product-left">
                        <p className="title b3">Regular Price</p>
                    </div>
                    <div className="bd-course-product-right">
                        <div className="form-input">
                            <input
                                name="regularPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                value={regularPrice}
                                onChange={(e) => onPriceChange?.('regularPrice', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="bd-course-product-item">
                    <div className="bd-course-product-left">
                        <p className="title b3">Sale Price (Discounted Price)</p>
                    </div>
                    <div className="bd-course-product-right">
                        <div className="form-input">
                            <input
                                name="salePrice"
                                type="number"
                                min="0"
                                step="0.01"
                                value={salePrice}
                                onChange={(e) => onPriceChange?.('salePrice', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
